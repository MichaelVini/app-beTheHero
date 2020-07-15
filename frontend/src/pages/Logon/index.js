import React, { useState } from 'react';
import './styles.css';
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import { FiLogIn } from 'react-icons/fi'
import api from '../../services/api'

// O componente link serve para que a pagina n recarregue, apenas direcione para rota desejada.
import { Link, useHistory } from 'react-router-dom'

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(event) {
        event.preventDefault();

        try {
            //Envia o id de login para o backend e retorna informações da ONG.
            const response = await api.post('sessions', { id });

            //Salvar o id e o nome da ONG no storage do navegador 
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            //Enviar o usuário para uma rota qualquer, sem a utilização do Link.
            history.push('/profile')

        } catch (err) {
            alert('Erro no acesso. Tente novamente.')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="logo" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input
                        type="text"
                        placeholder="Sua ID"
                        value={id}
                        // Ouvir as mudanças(event) no input ID e alterar a variável id
                        onChange={event => setId(event.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="heroes" />
        </div>
    );
}