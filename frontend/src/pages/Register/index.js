import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'
import api from '../../services/api'

export default function Register() {
    //useState retorna dois valores (O primeiro é o valor atual, o segundo é uma função para atualizar o valor)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const history = useHistory();

    async function handleRegister(event) {
        // Evitar que a pagina recarregue ao enviar o formulário.
        event.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try {
            //Enviar dados para o backend e retornar um id de acesso.
            const response = await api.post('ongs', data);

            alert(`Seu ID de acesso: ${response.data.id}`);

            // Enviar o usuario de volta pra home.
            history.push('/');

        } catch (err) {
            alert('Erro no cadastro, tente novamente');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiLogIn size={16} color="#E02041" />
                        Já tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Nome da ONG"
                        value={name}
                        //Ouvir as mudanças que acontecem no input (Pegar o event de mudança e adicionar na variavel name)
                        onChange={event => setName(event.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <input
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={event => setWhatsapp(event.target.value)}
                    />


                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Cidade"
                            value={city}
                            onChange={event => setCity(event.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={event => setUf(event.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}