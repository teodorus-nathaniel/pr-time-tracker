// import {} from "$env/static/private";

type Config = {
    mongoDBUri: string;
    mongoDBName: string;
}

let config: Config = {
    mongoDBUri: "",
    mongoDBName: "",
}

export default config;