import { format, formatDistanceToNow } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';

interface Author{
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: 'paragraph' | 'link' | 'hashtag';
    content: string;
}

export interface PostType {
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[];
}

interface PostProps {
    post: PostType;
}

export function Post({ post }: PostProps) {
    const [comments, setComments] = useState([
        'Post, top'
    ])

    const [newCommentText, setNewCommentText] = useState('')


    const publishedDateFormatted = format(post.publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", {
        locale: pt,
      });

      const publishedDateRelativeToNow = formatDistanceToNow( post.publishedAt, {
        locale: pt,
        addSuffix: true,
      })

      function handleCreateNewComment(event: FormEvent) {
          event.preventDefault()

          setComments([...comments, newCommentText]);
          setNewCommentText('');
      }

      function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
      }

      function deleteComment(commentToDelete: string) {
        const commentWithoutDeleteOne = comments.filter(comment => {
          return comment !==  commentToDelete;
        })
          setComments(commentWithoutDeleteOne);
      }

      function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Campo Obrigatorio')
      }

      const isNewCommentEmpty = newCommentText.length === 0;

      
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl}  />
                    <div className={styles.authorinfo}>
                        <strong>{post.author.name} </strong>
                        <span>{post.author.role} </span>
                    </div>
                </div>

                <time title= {publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
                        {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {post.content.map(line => {
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