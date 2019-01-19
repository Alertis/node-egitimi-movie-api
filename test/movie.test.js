const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();
const server=require('../app');

chai.use(chaiHttp);

let token;

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
});

