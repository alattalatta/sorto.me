import { main as buildDocs } from './buildDocs'
import { main as buildPosts } from './buildPosts'

Promise.all([buildDocs(), buildPosts()]).catch(console.error)
