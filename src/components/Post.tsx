import { format, formatDistanceToNow, set } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './comment';

import styles from './Post.module.css';

export function Post({ author, publishedAt, content }) {
    const [comments, setComments] = useState([
        'Post, top'
    ])

    const [newCommentText, setNewCommentText] = useState('')


    const publishedDateFormatted = format(publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", {
        locale: pt,
      });

      const publishedDateRelativeToNow = formatDistanceToNow( publishedAt, {
        locale: pt,
        addSuffix: true,
      })

      function handleCreateNewComment(event) {
          event.preventDefault()

          const newCommentText = event.target.comment.value

          setComments([...comments, newCommentText]);
          setNewCommentText('');
      }

      function handleNewCommentChange(event) {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
      }

      function deleteComment(commentToDelete) {
        const commentWithoutDeleteOne = comments.filter(comment => {
          return comment !==  commentToDelete;
        })
          setComments(commentWithoutDeleteOne);
      }

      function handleNewCommentInvalid(event) {
        event.target.setCustomValidity('Campo Obrigatorio')
      }

      const isNewCommentEmpty = newCommentText.length === 0;

      
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl}  />
                    <div className={styles.authorinfo}>
                        <strong>{author.name} </strong>
                        <span>{author.role} </span>
                    </div>
                </div>

                <time title= {publishedDateFormatted} datetime={publishedAt.toISOString()}>
                        {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>;
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href="#">{line.content}</a></p>;
                    } else if (line.type === 'hashtag') {
                        return <a key={line.content} href="#">{line.content}&nbsp;</a>;
                    }
                })}
            </div>



            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe aqui o teu comentario</strong>

                <textarea
                    name= "comment"
                    placeholder='Deixe um comentario'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button type='submit'disabled={isNewCommentEmpty}>
                      Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                  return( 
                    < Comment 
                        key={comment} 
                        content={comment} 
                        onDeleteComment={deleteComment} 
                    />
                  )
                })}
            </div>


        </article>
    );
}