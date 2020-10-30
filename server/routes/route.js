import express from 'express';
import { checkToken } from '../helpers/auth';
import {userRegister, userLogin, listUsers, updateProfile, userChangeRole} from '../controllers/users';
import { addQueries, listQueries } from '../controllers/queries';
import { addBlog, listBlog,
   singleBlog,
    listBlogOwner,
     deleteBlog,
      updateBlog }
from '../controllers/articles';
import { addComments, listComments } from '../controllers/comments';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' })



const router = express.Router();
router.get('/api/v1', (req, res) => {
  res.send({ message: 'Welcome to Marcel parsonal web API' });
});
router.post('/api/v1/usersRegister', userRegister)
router.post('/api/v1/userLogin', userLogin)
router.get('/api/v1/listUsers', checkToken, listUsers)
router.post('/api/v1/blog', checkToken, addBlog)
router.get('/api/v1/blogs', listBlog)
router.get('/api/v1/blogs/:id', singleBlog)
router.delete('/api/v1/blogs/:id', checkToken, deleteBlog)
router.put('/api/v1/blogs/:id', checkToken, updateBlog)
router.get('/api/v1/myBlog', checkToken, listBlogOwner)
router.post('/api/v1/queries', addQueries)
router.get('/api/v1/queries', checkToken, listQueries)
router.post('/api/v1/comments/:id', checkToken, addComments)
router.get('/api/v1/comments/:id', checkToken, listComments)
router.put('/api/v1/updateUser', checkToken, updateProfile)
router.put('/api/v1/changeuser/:id', checkToken, userChangeRole)





export default router;
