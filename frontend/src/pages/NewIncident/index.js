import React from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './style.css';
import { useState } from 'react';
import api from '../../services/api';


export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(event) {
        //Evitar o recarregamento da pagina
        event.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {
            //Envia os dados do incident para o backend
            const response = await api.post('/incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })

            history.push('/profile')

        } catch (err) {
            alert('Erro no cadastro do caso. Tente novamente')
        }

    }

    return (
        <div className="newincident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                    Voltar para home
                </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        type="text"
                        placeholder="Título do caso"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    ></textarea>
                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}