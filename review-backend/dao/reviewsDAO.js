import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return
        }

        try {
            reviews = await conn.db("reviews").collection("reviews")
        } catch (e) {
            console.error(`unable tto estabilish connection handles in UserDAO :${e}`)
        }
    }

    static async addReview(movieId, user, review) {
        try {
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review
            }
            return await reviews.insertOne(reviewDoc)
        } catch (e) {
            console.error(`unable to process request ${e}`)
            return { error: e }
        }
    }

    static async getReview(reviewId) {
        try {
            return await reviews.findOne({ _id: ObjectId(reviewId) })
        } catch (e) {
            console.error(`unable to review : ${e}`)
            return { error: e }
        }
    }

    static async updateReview(reviewId, user, review) {
        try {
            const updateResponse = await review.updateOne({ _id: ObjectId(reviewId) }, { set: { user: user, review: review } })
            return updateResponse
        } catch (e) {
            console.error(`unable to update review:${e}`)
            return { error: e }
        }
    }

    static async deleteReview(reviewId) {
        try {
            const deleteResponse = await review.deleteOne({ _id: ObjectId(reviewId) })
            return deleteResponse
        } catch (e) {
            console.error(`unable to update delete:${e}`)
            return { error: e }
        }
    }

    static async getReviewsByMovieId(movieId) {
        try {
            const cursor = await review.find({ movieId: parseInt(movieId) })
            return cursor.toArray()
        } catch (e) {
            console.error(`unable to update get reviews:${e}`)
            return { error: e }
        }
    }
} 
