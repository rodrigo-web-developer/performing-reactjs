import { faker } from "@faker-js/faker";
import fs from "fs";

const customerFake = (index) => ({
    id: index + 1_000_000,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    jobTitle: faker.person.jobTitle()
});

const randomData = Array.from({ length: 5000 }, (_, index) => customerFake(index));

fs.writeFileSync("./api/data.json", JSON.stringify({ customers: randomData }));