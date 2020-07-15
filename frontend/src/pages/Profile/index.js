import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './style.css';
import api from '../../services/api';


export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    //buscar o nome da ong no storage do navegador.
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    // O useEffect serve para disparar uma função em um determinado momento.
    // (Primeiro parâmetro: Qual função deseja disparar, Segundo parãmetro: um array que ao ser alterado dispara a função do primeiro parãmetro.)
    // OBS: Quando o segundo parãmetro for vazio, a função será executada apenas uma vez.
    useEffect(() => {
        //Pegar todos os incidents, através do id logado e colocar na variável incident através do setIncidents
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    //Remover casos:
    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            //remover o incident sem atualizar a pagina
            setIncidents(incidents.filter(incident => incident.id != id));

        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="" />
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="incidents/new">Cadastrar novo caso.</Link>
                <button onClick={handleLogout} type="button"> <FiPower size={18} color="#E02041" /> </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button"> <FiTrash2 size={20} color="#a8a8b3" /> </button>
                    </li>
                )
                )}
            </ul>
        </div>
    );
}