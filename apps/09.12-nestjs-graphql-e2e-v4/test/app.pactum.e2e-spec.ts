import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as pactum from "pactum";
import { AppModule } from "../src/app.module";
import { Cat } from "../src/cat/models/cat-query.dto";

const cats: Cat[] = [
  {
    name: "Ventus",
    age: 4,
    breed: "Russian Blue",
    id: "1",
  },
  {
    name: "Terra",
    age: 5,
    breed: "Siberian",
    id: "2",
  },
  {
    name: "Aqua",
    age: 3,
    breed: "Maine Coon",
    id: "3",
  },
];

describe("GraphQL AppResolver (e2e) {Pactum}", () => {
  let app: INestApplication;
  let url: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.listen(0);
    url = await app.getUrl();
    pactum.request.setBaseUrl(url.replace("[::1]", "localhost"));
  });

  afterAll(async () => {
    await app.close();
  });

  describe("/graphql", () => {
    describe("/cats", () => {
      it("sould get the cat array", () => {
        return pactum
          .spec()
          .post("/graphql")
          .withGraphQLQuery(
            `query cats {
          getCats {
            id
            name
            age
            breed
          }
        }`
          )
          .expectStatus(200)
          .expectBody({
            data: {
              getCats: cats,
            },
          });
      });
    });
    describe("one cat", () => {
      it("should get a single cat", () => {
        return pactum
          .spec()
          .post("/graphql")
          .withGraphQLQuery(
            `query cat($cat: CatInput!){
              getCat(catId:$cat) {
                id
                name
                age
                breed
              }
            }`
          )
          .withGraphQLVariables({
            cat: {
              id: "2",
            },
          })
          .expectStatus(200)
          .expectBody({
            data: {
              getCat: {
                name: "Terra",
                age: 5,
                breed: "Siberian",
                id: "2",
              },
            },
          });
      });
      it("should get an error for a bad id", () => {
        return (
          pactum
            .spec()
            .post("/graphql")
            .withGraphQLQuery(
              `query cast($cat: CatInput!){
                getCat(catId:$cat){
                  id
                  name
                  age
                  breed
                }
              }`
            )
            .withGraphQLVariables({
              cat: {
                id: "500",
              },
            })
            .expectStatus(200)
            // verify that the response has an error array with at least one object that has the following message
            .expectJsonLike({
              errors: [
                {
                  message: "No cat with id 500 found",
                },
              ],
            })
        );
      });
    });
  });
});
