require('dotenv/config');
const mongoose = require('mongoose')

const { mongoURITest: TEST_MONGODB_URL } = require('../../config/uri')

const retrieve = require('./retrieve');
const codeGenerator = require('../../utils/generator-random');
const { expect } = require('chai');
const { random } = Math;
const URL = require('../../models/schema');
const bodyParser = require('body-parser');


describe('retrieve shorcode', () => {
    before(() => mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }))

    let url, shortcode, result;

    beforeEach(() =>
        URL.deleteMany()
            .then(() => {
                debugger
                url = `http://${random}.com`;
                shortcode = codeGenerator();
                console.log(shortcode);

            })
    )

    describe('when url and code already exists', () => {
        beforeEach(() =>
            URL.create({ url, shortcode })
                .then(doc => {
                    result = doc
                    console.log(doc.url);
                })
        )

        it('should succeed on correct shortcode', () =>
            retrieve(result)
                .then(doc => {
                    console.log(doc);
                    expect(doc.url).to.equal(url)
                    expect(doc.shortcode).to.equal(shortcode)
                    expect(doc.visits).to.exist
                    expect(doc.created).to.exist
                })
        )
    })

    // it('should fail when user does not exist', () => {
    //     const userId = '5ed1204ee99ccf6fae798aef'

    //     return retrieveUser(userId)
    //         .then(() => { throw new Error('should not reach this point') })
    //         .catch(error => {
    //             expect(error).to.exist

    //             expect(error).to.be.an.instanceof(Error)
    //             expect(error.message).to.equal(`user with id ${userId} does not exist`)
    //         })
    // })

    afterEach(() => URL.deleteMany())

    after(mongoose.disconnect)
})