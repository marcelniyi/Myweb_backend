import Articles from '../models/articles';
import jwt from 'jsonwebtoken';
import { validArticle } from '../validations/articles.validation'
import mongoose from 'mongoose';

export const addBlog = async (req, res) => {
      const blog = req.body;
      const {error} = validArticle(blog);
        if (error){
            res.status(400).json({
                message: error.details[0].message
            })
            return false;
        }

        const exist = await Articles.findOne({ title: blog.title});
        if(exist){
          res.status(409).json({errer: "Blog already exist"})
          return
        }
        const addBlog = new Articles({
          title: blog.title,
          descriptions: blog.descriptions,
          image: req.body.image,
          author: req.data.user.id,
        })
        try {
          const result = await addBlog.save();
          res.status(201).json({
            message: 'blog added successfully',
            result
          });
        }catch(err) {
          throw new Error(err);
        }
}

export const listBlog = async (req, res) => {
    const articles = await Articles.find({});
    try {
      res.status(200).json({articles});
    } catch (err) {
      res.status(500).send(err);
    }
}


export const singleBlog = async (req, res) => {
  const { id } = req.params;
  if(!id) return res.status(400).json({error: 'Provide blog id'})
    const articles = await Articles.findOne({_id: id});
  if(!articles) return res.status(400).json({error: 'Invalid blog'})
    try {
      res.status(200).json({articles});
    } catch (err) {
      res.status(500).send(err);
    }
}


export const listBlogOwner = async (req, res) => {
    const articles = await Articles.find({author: req.data.user.id});
    try {
      res.status(200).json({articles});
    } catch (err) {
      res.status(500).send(err);
    }
}


export const deleteBlog = async (req, res) => {
      const {id} = req.params
      if (!mongoose.Types.ObjectId.isValid(id)) return res
      .status(400).json({error: 'No blog with this id'});
      try {
        const article = await Articles.findById(id);
        if(!article) res.status(404).json({error: 'No blog with thi id!'});
        if(article.author !== req.data.user.id) res.status(401).json({error: 'Blog is not yours'});

        const articleToDelete = await Articles.findByIdAndDelete(article._id);
        return res.status(200).json({message: 'Blog deleted successfully'});
      } catch (err) {
        res.status(500).json({err})
      }
}

export const updateBlog = async (req, res) => {
  const {id} = req.params;
  const { title, descriptions } = req.body;
  try {
      if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({error: 'Invalid id!'});

      const article = await Articles.findById(id);
      if(!article) res.status(404).json({error: 'No blog with thi id!'});
      if(article.author !== req.data.user.id) res.status(401).json({error: 'Blog is not yours'});
      article.set({
          title: title,
          descriptions: descriptions,
      });
      const editedOne = await article.save();
       return res.status(200).json({message: 'Article updated'})
  } catch(err) {
      return res.status(500).json({error: err.message})
  }
}
