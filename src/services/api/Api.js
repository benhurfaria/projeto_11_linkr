import axios from "axios";

function signUp(body, setDisabled) {
    const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/sign-up", body);
    promise.catch(err => {
        setDisabled(false);
        if (err.response.status === 403) {
            alert("Email já cadsatrado!")
        };
        if(err.response.status === 400){
            alert('Dados inseridos são invalídos!');
        };
    })
    return promise;
}

function mandarPost(body, config, setUrlLink, setTexto, setStatus2, setUserPostsArray, userPostsArray){
    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts", body, config)
            .then(res =>{

                setUrlLink("");
                setTexto("");
                setStatus2({disable:"", cor: "", status: "Publicar"});
                setUserPostsArray([res.data.post, ...userPostsArray]);
            })
            .catch(err =>{
                console.log(body);
                console.log(config);

                alert("Houve um erro ao publicar seu link");
                setUrlLink("");
                setTexto("");
                setStatus2({disable:"", cor: "", status: "Publicar"});
            });
    
};

function login(body, setDisabled) {
    const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/sign-in', body);
    promise.catch(err => {
        setDisabled(false)
        if (err.response.status === 401) {
            alert('Usuário/senha incorretos');
        }
        if (err.response.status === 400) {
            alert('Dados inseridos são invalídos!');
        }
        if (err.response.status === 403) {
            alert("Usuario não encontrado!");
        }
    })
    return promise;
};

function getHashtag( config){
    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/hashtags/trending", config);
    return promise;
};



export { signUp, login, getHashtag, mandarPost }

