const express=require('express');
const ejs=require('ejs');
const mongoose=require('mongoose');

const app=express();

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.listen(3000,function(req,res)
{
    console.log("Hello");
});

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema=new mongoose.Schema
(
    {
        title:String,
        content:String
 
    }
)

const Article=mongoose.model("Article",articleSchema)

// Reading operation in our API
/*
app.get("/articles",function(req,res)
{

    Article.find({},function(err,results)
    {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send(results);
        }
    })

});
*/

// Posting operation in our API
/*
app.post("/articles",function(req,res)
{
    const newArticle=new Article
    (
        {
            title:req.body.title,
            content:req.body.content
        }
    )
    
    newArticle.save(function(err)
    {
        if(!err)
        {
            res.send("Successfully added the article")
        }
        else
        {
            res.send(err)
        }
    });
});
*/

//Deleting request in our Restful API
/*
app.delete("/articles",function(req,res)
{

    Article.deleteMany({},function(err)
    {
        if(err)
        {
            res.send(err);
        }   
        else
        {
            res.send("Successfully deleted all the articles");
        }
    });
});
*/

// Chained Route Handlers using Express
// Request targetting all articles 

app.route("/articles")

.get(function(req,res)
{

    Article.find({},function(err,results)
    {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send(results);
        }
    })

})

.post(function(req,res)
{
    const newArticle=new Article
    (
        {
            title:req.body.title,
            content:req.body.content
        }
    )
    
    newArticle.save(function(err)
    {
        if(!err)
        {
            res.send("Successfully added the article")
        }
        else
        {
            res.send(err)
        }
    });
})

.delete(function(req,res)
{

    Article.deleteMany({},function(err)
    {
        if(err)
        {
            res.send(err);
        }   
        else
        {
            res.send("Successfully deleted all the articles");
        }
    });
});

// request targetting a specific route
app.route("/articles/:articleTitle")

.get(function(req,res)
{
  Article.findOne({title:req.params.articleTitle},function(err,result)
   {
      if(result)
      {
          res.send(result)
      }
      else
      {
          res.send("No related data to the title found")
      }
  })
})
.put(function(req,res)
{
    Article.updateOne
    (
        {title:req.params.articleTitle},
        {title:req.body.title,content:req.body.content},
        function(err)   
        {
            if(!err)
            {
                res.send("Successfully Updated article.")
            }
        }
    )
})
// Patch method just changes the values that have been specified to change.

.patch(function(req,res)
{
    
    Article.updateOne
    (
        {title:req.params.articleTitle},
        // Its get the value of all the attributes that user specifies in the postman to change in patch request
        {$set:req.body},
        function(err)
        {
            if(!err)
            {
                res.send("Successfully updated the articles")
            }
            else
            {
                res.send(err)
            }
        }
        
    )
})

.delete(function(req,res)
{
    Article.deleteOne({title:req.params.articleTitle},function(err)
    {
        if(!err)
        {
         res.send("Successfully deleted from the databse")
        }
        else
        {
            res.send(err)
        }
    })
});

// space==%20

 