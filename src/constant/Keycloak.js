import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: 'http://localhost:8080/',
    realm: 'testrealm',
    clientId: 'authentificationClientId',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
