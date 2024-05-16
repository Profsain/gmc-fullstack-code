import {Routes, Route} from 'react-router-dom'
import './App.css'
import NavigationCom from './components/header/NavigationCom'
import Home from './components/homepage/Home'
import Blogs from './components/post/Blogs'
import AddPost from './components/post/AddPost'
import Contact from './components/contact/Contact'
import Books from './components/books/Books'
import NotFound from './components/errorPages/NotFound'
import SinglePost from './components/post/SinglePost'


function App() {

  return (
    <>
      <NavigationCom />
      {/* define routes */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/add-post' element={<AddPost />} />
        <Route path='/post/:id' element={<SinglePost />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/free/books' element={<Books />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      
    </>
  )
}

export default App
