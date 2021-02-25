const joi = require('joi');

const movieIdSchema = joi.string().regex(/^[a-zA-Z0-9]{3,30}$/);
const movieTitleSchema = joi.string().max(80);
const movieYearSchema = joi.number().min(1888).max(2077);
const movieCoverSchema = joi.string().uri();
const movieDescriptionSchema = joi.string().max(300);
const movieDurationSchema = joi.number().min(1).max(300);
const movieContentRaiting = joi.string().max(5);
const movieSourceSchema = joi.string().uri();
const movieTagsSchema = joi.array().items(joi.string().max(50))

const createMovieSchema = {
    title: movieTitleSchema.required(),
    year: movieYearSchema.required(),
    cover: movieCoverSchema.required(),
    description: movieDescriptionSchema.required(),
    duration: movieDurationSchema.required(),
    contentRaiting: movieContentRaiting.required(),
    source: movieSourceSchema.required(),
    tags: movieTagsSchema
};

const updateMovieSchema = {
    title: movieTitleSchema,
    year: movieYearSchema,
    cover: movieCoverSchema,
    description: movieDescriptionSchema,
    duration: movieDurationSchema,
    contentRaiting: movieContentRaiting,
    source: movieSourceSchema,
    tags: movieTagsSchema
};

module.exports = {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
}