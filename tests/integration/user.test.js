import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';

import app from '../../src/index';
let userToken;
let passLink;
let noteId;

describe('User APIs Test', () => {
      before((done) => {
        const clearCollections = () => {
          for (const collection in mongoose.connection.collections) {
            mongoose.connection.collections[collection].deleteOne(() => {});
          }
        };

        const mongooseConnect = async () => {
          await mongoose.connect(process.env.DATABASE_TEST);
          clearCollections();
        };

        if (mongoose.connection.readyState === 0) {
          mongooseConnect();
        } else {
          clearCollections();
        }

        done();
      });

      describe('POST /registration', () => {
          it('given new user when added should return status 201 ', (done) => {
            const userdetails = {
              firstName: "varsha",
              lastName: "laxman",
              emailId: "testing@gotgel.org",
              password: "varsha123"
            }
            request(app)
              .post('/api/v1/users/registration')
              .send(userdetails)
              .end((err, res) => {
              expect(res.statusCode).to.be.equal(HttpStatus.CREATED);

                done();
              });
          });

        it('should give a validation error ', (done) => {

          const userdetails = {
            firstName: "neha",
            lastName: "patil",
            email: "nehacom",
            password: "neha123"
          };

          request(app)
            .post('/api/v1/users/registration')
            .send(userdetails)
            .end((err, res) => {
              expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
              done();
            });
        });
      });

      describe(`POST /login`, () => {
        it('should login with user', (done) => {
          const userdetails = {
            emailId: "testing@gotgel.org",
              password: "varsha123"
          };

          request(app)
            .post('/api/v1/users/login')
            .send(userdetails)
            .end((err, res) => {
              userToken = res.body.data;
              expect(res.statusCode).to.be.equal(HttpStatus.OK);
              done();
            });
        });
      });

      describe(`POST/forgotPassword`, () => {
        it('A Password Reset mail is sent ', (done) => {
          const userdetails = {
            emailId: "testing@gotgel.org"
          };

          request(app)
            .post('/api/v1/users/forgotPassword')
            .send(userdetails)
            .end((err, res) => {
              passLink = res.body.data;
              expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
            done();
          });
        });

        it('does not send link to Invalid user details', (done) => {
          const userdetails = {
            emailId: "test@gotgel.org"
          };

          request(app)
            .post('/api/v1/users/forgotPassword')
            .send(userdetails)
            .end((err, res) => {
              expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
            done();
          });
        });
      });

      describe(`PUT/resetPassword`, () => {
        it('resets the password', (done) => {
          const userdetails = {
            password: "newpass"
          };

          request(app)
            .post('/api/v1/users/resetPassword')
            .set('AuthToken', `bearer ${passLink}`)
            .send(userdetails)
            .end((err, res) => {
              console.log(passLink);
              expect(res.statusCode).to.be.equal(HttpStatus.OK);
              done();
            });
        });
      });

      describe('POST/notes', () => {
        it('Creates a new note', (done) => {
          const notedetails={
            Title:"new note",
            Description:"This the first note"
          };
          request(app)
            .post('/api/v1/notes/new')
            .send(notedetails)
            .set('Authorization', `bearer ${userToken}`)
            .end((err,res)=>{
              noteId = res.body.data._id;
              expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
              done();
          });
        });  
      });
      describe('POST/notes', () => {
        it('this updates the note ', (done) => {
          const notedetails={
            Title:"Updated note",
            Description:"The First note is updated"
          };
          request(app)
            .post(`/api/v1/notes/update/${noteId}`)
            .send(notedetails)
            .set('Authorization', `bearer ${userToken}`)
            .end((err,res)=>{
              expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
              done();
            });  
        });
      });

      describe(`GET /get All Notes`, () => {

        it(' should get all Notes of Authorized User', (done) => {
          request(app)
            .get('/api/v1/notes/get')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
              expect(res.statusCode).to.be.equal(HttpStatus.OK);
              done();
            });
        });
      });
    
      describe(`GET /get Note By _id`, () => {
    
        it(' should get a Note by its _id  for Authorized User', (done) => {

          request(app)
            .get(`/api/v1/notes/getbyId/${noteId}`)
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
              expect(res.statusCode).to.be.equal(HttpStatus.OK);
              done();
            });
        });
      });

      describe(`PUT/ to Archive the note`, () => {
        it(' should add a Note to archive by using _id', (done) => {
          request(app)
            .put(`/api/v1/notes/isArchived/${noteId}`)
            .set('Authorization', `Bearer ${userToken}`)

            .end((err, res) => {
              expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
              done();
            });
        });
      });

      describe(`PUT /add a  Note to TrashBin By _id`, () => {
         it(' should add a Note to TrashBin by its _id  for Authorized User', (done) => {
          request(app)
            .put(`/api/v1/notes/inTrash/${noteId}`)
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
              expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
              done();
            });
        });
      });

      describe(`DELETE /delete a  Note to`, () => {
        it(' should delete  Note  by its userId  for Authorized User', (done) => {
          request(app)
            .delete(`/api/v1/notes/delete/${noteId}`)
            .set('Authorization', `bearer ${userToken}`)

            .end((err, res) => {
              expect(res.statusCode).to.be.equal(HttpStatus.OK);
              done();
            });
        });
      });
    }); 

