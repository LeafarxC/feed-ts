import styles from './Sidebar.module.css';
import { PencilLine } from 'phosphor-react';
import { Avatar } from './Avatar';

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>

            <img 
            className={styles.cover}
            src="https://images.unsplash.com/photo-1568696691737-b81ace4027b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50" 
            alt="Imagem banner sidebar" 
            />

            <div className={styles.profile}>
                <Avatar src="https://github.com/leafarxc.png" />
                
                <strong>Rafael Vieira da Costa</strong>
                <span>Web Developer</span>
            </div>

            <footer>
              <a href="">
                <PencilLine size={20} />
                Editar Perfil
              </a>
            </footer>
        </aside>
    );
}