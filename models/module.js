module.exports = {
    module : function(app,cnx){

        app.post('/api/insert/module',(req,res) => {
            const codeModule = req.body.codeModule
            const titreModule = req.body.titreModule
            const masseHoraire = req.body.masseHoraire
            const codeFiliere = req.body.codeFiliere
            const codeGroupe = req.body.codeGroupe
            
            

            const stmt = cnx.run(`INSERT INTO module VALUES (NULL,${codeModule},${titreModule},${masseHoraire})`,(err)=>{
                if (err) return console.error("Error lors de l'ajout de ce module");
            });
            
            codeGroupe.values.forEach(element => {
                const stmt2 = cnx.prepare(`INSERT INTO groupe_module_filiere VALUES (${element},${codeModule},${codeFiliere})`,(err)=>{
                    if (err) return console.error("Module dupliqué");
                });
            });
            
        
        
        })
       



        try {
            app.get('/api/select/module/',(req,res) => {  
                const row = cnx.prepare("SELECT * from module ORDER BY titreModule").all()
                res.send(row);
            })
        } catch (err) {
            console.log("Une erreur a occuré")
        }
        
        
        try {
            app.get('/api/select/module/:FiliereChoisis',(req,res) => {
                const FiliereChoisis = req.params.FiliereChoisis
                cnx.all("SELECT codeModule , titreModule , masseHoraire from module M inner join groupe_module_filiere GM ON M.idModule = GM.idModule WHERE codeFiliere = ?",[FiliereChoisis] ,(err, row) => {
                    res.send(row)
                    if (err) throw err;
                })
            })
        } catch (err) {
            console.log("Une erreur a occuré")
        }

        
        try {
            app.delete('/api/delete/module/:idModule',(req,res)=>{
                const module = req.params.idModule
                const stmt = cnx.prepare("DELETE FROM module WHERE idModule = ?",(err)=>{
                    if (err) throw err;
                });
                stmt.run([module])
            }) 
        } catch (err) {
            console.log("Une erreur a occuré")
        }



    }
}




