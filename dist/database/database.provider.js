"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const mots_model_1 = require("../models/mots.model");
const documents_model_1 = require("../models/documents.model");
const occurences_model_1 = require("../models/occurences.model");
exports.databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new sequelize_typescript_1.Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'myrootpassword',
                database: 'indexation',
            });
            sequelize.addModels([mots_model_1.Mot, documents_model_1.Document, occurences_model_1.Occurrence]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
//# sourceMappingURL=database.provider.js.map