const {response,request}=require('express');


const usuariosGet = (req=request , res = response) => {

    const {id, page = '1'} = req.query;
    res.json({
        msg:'get API desde controllers',
        id,
        page
    });
}

const usuariosPost = (req, res) => {
    const {nombre,email} = req.body;
    res.json({
        msg:'post API',
        nombre,
        email
    });
}

const usuariosPut = (req, res) => {
    res.json({
        msg:'put API'
    });
}


const usuariosDelete = (req= request, res) => {
    const idUser = req.params.idUser;
    res.json({
        msg:'delete API',
        idUser
    });
}


module.exports= {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}