const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();
const server=require('../app');

chai.use(chaiHttp);

let token,movie_id;

describe('/api/movies Test', ()=>{
    before((done)=>{
        chai.request(server)
        .post('/authenticate')
        .send({username:'Alertis',password:'Alertis'})
        .end((err,res)=>{
            if(err)
                throw err;
            token=res.body.token;
            done();
        });
    });

    describe('/GET movies',()=>{
        it('it should get all the movies',(done)=>{
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST movie',()=>{
        it('it should get a movie',(done)=>{
            const movie={
                title:'Udemy',
                director_id:'5c41d3fa9aca0f17ce1277dd',
                category:'Test',
                country:'Turkey',
                year:1950,
                imdb_score:8
            }
            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    movie_id=res.body._id;
                    done();
                });
        });
    });

    describe('/GET/:movie_id movie',()=>{
        it('it should get a movie by the given id',(done)=>{
            chai.request(server)
                .get('/api/movies/'+movie_id)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id').eql(movie_id);
                    done();
                });
        });
    });

    describe('/PUT/:movie_id movie',()=>{
        it('it should update a movie given by id',(done)=>{
            const movie={
                title:'UpdateTest',
                director_id:'5c41d3fa9aca0f17ce1277d7',
                category:'Update',
                country:'China',
                year:1970,
                imdb_score:6
            }
            chai.request(server)
                .put('/api/movies/'+movie_id)
                .send(movie)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('director_id').eql(movie.director_id);
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('year').eql(movie.year);
                    res.body.should.have.property('imdb_score').eql(movie.imdb_score);
                    done();
                });
        });
    });

    describe('/DELETE/:movie_id movie',()=>{
        it('it should Delete a movie given by id',(done)=>{
            chai.request(server)
                .delete('/api/movies/'+movie_id)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });
        });
    });
});

