const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class NotesController {
    async create(request, response) {
        const { title, description, rating, tags } = request.body;
        const user_id = request.user.id;

        if(typeof rating !== 'number') {
            throw new AppError("O valor da nota deve ser um número")
        }

        const ratingInteger = Number.isInteger(rating);
        const ratingInterval = rating >= 1 && rating <= 5;

        if(!ratingInteger || !ratingInterval) {
            throw new AppError("O valor da nota deve ser um número inteiro entre 1 e 5");
        }

        const [note_id] = await knex("movieNotes").insert({
            title,
            description, 
            rating,
            user_id
        }); 

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        });

        await knex("tags").insert(tagsInsert);

        return response.json()
    }

    async show(request, response) {
        const { id } = request.params;

        const note = await knex("movieNotes").where({ id }).first();
        const tags = await knex("tags").where({ note_id: id }).orderBy("name");

        return response.json({
            ...note,
            tags
        })
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("movieNotes").where({ id }).delete();

        return response.json()
    }

    async index(request, response) {
        const { title, tags } = request.query;
        const user_id = request.user.id;        

        let notes;

        if(tags) {
            const filteredTags = tags.split(",").map(tag => tag.trim());
            
            notes = await knex("tags")
             .select([
                "movieNotes.id",
                "movieNotes.title",
                "movieNotes.user_id"
             ])
             .where("movieNotes.user_id", user_id)
             .whereLike("movieNotes.title", `%${title}%`)
             .whereIn("name", filteredTags)
             .innerJoin("movieNotes", "movieNotes.id", "tags.note_id")
             .orderBy("movieNotes.title")

        } else {
            notes = await knex("movieNotes")
             .where({ user_id })
             .whereLike("title", `%${title}%`)
             .orderBy("created_at", "desc")
        }

        const userTags = await knex("tags").where({ user_id });
        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id);

            return {
                ...note,
                tags: noteTags
            }
        })


        return response.json(notesWithTags)

    }
}

module.exports = NotesController;