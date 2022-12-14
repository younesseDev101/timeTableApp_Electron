module.exports = {
    formateur : function(app,cnx){

        try {
            app.get('/api/select/formateurs',(req,res) => {

                const row = cnx.prepare("SELECT * from formateur ORDER BY nom").all()
                res.send(row);
                  
            })
        } catch (err) {
            console.log("Une erreur a occuré")
        }

        
      
        app.post('/api/insert/formateur',(req,res) => {
            const nom = req.body.nom
            const prenom = req.body.prenom
            const mh = req.body.massHoraire
            const departement = req.body.departement
            const email = req.body.email
            const tel = req.body.tel
        
            const stmt = cnx.prepare(`INSERT INTO formateur (nom,prenom,massHoraire,email,tel,departement) VALUES (${nom},${prenom},${mh},${email},${tel},${departement})`,(err)=>{
                if (err) return console.error("Error lors de l'ajout de ce formateur");
            });
        }) 
    

        
        try {
            app.delete('/api/delete/formateur/:idFormateur',(req,res)=>{
                const formateur = req.params.idFormateur
                const stmt = cnx.prepare("DELETE FROM formateur where idFormateur = ?",(err)=>{
                    if (err) throw err;
                });
                stmt.run([formateur])
            })
        } catch (err) {
            console.log("Une erreur a occuré")
        }


        try {
            app.put('/api/update/formateur',(req,res) => {
                const newNom = req.body.newNom
                const newPrenom = req.body.newPrenom
                const newMassHoraire = req.body.newMassHoraire
                const newDepartement = req.body.newDepartement
                const newEmail = req.body.newEmail
                const newTel = req.body.newTel
                const idForamteur = req.body.idForamteur
                const stmt = cnx.prepare("UPDATE formateur SET nom = ? , prenom = ? , massHoraire = ? , email = ? , tel = ? , departement = ? WHERE idFormateur = ?",(err)=>{
                    if (err) throw err;
                });
                stmt.run([newNom,newPrenom,newMassHoraire,newEmail,newTel,newDepartement,idForamteur])
            })
        } catch (err) {
            console.log("Une erreur a occuré")
        }
        
        
    }
}




