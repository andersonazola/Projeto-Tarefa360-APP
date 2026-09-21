import { Form } from "react-bootstrap";
import style from "./Login.module.css";
import { useState } from "react";
import LoginAPI from "../../services/loginAPI";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/LogoAzul.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useAlert } from '../../componentes/Alert/AlertContext';

export function Login() {
    const { mostrarAlerta } = useAlert();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [verSenha, setVerSenha] = useState('password')

    const navigate = useNavigate();

    const isFormValid = () => {
        return email.length > 5 && senha.length >= 6;
    };

    async function handleSenha() {
        verSenha === 'password' ? setVerSenha('text') : setVerSenha('password')
    }

    async function handleLogin(e) 
    {
        e.preventDefault();

        if (!isFormValid()) {
            mostrarAlerta("Insira um e-mail válido e uma senha com no mínimo 6 caracteres.", "warning");
            return;
        }

        try 
        {
            const response = await LoginAPI.loginAsync(email, senha);

            if (response?.status === 200) {
                localStorage.setItem("usuario", JSON.stringify(response.data));
                navigate("/dashboard");
            }
        }
        catch (error) 
        {
            if (error.response?.status === 404) 
            {
                mostrarAlerta("Usuário não encontrado, é necessário solicitar ao Admin responsável que realize o cadastro desse usuário.", "danger");
                setEmail("");
                setSenha("");
            }
            else if (error.response?.status === 401) 
            {
                mostrarAlerta("Senha incorreta, por favor tente novamente.", "danger");
                setSenha("");
            }
            else
            {
                mostrarAlerta("Erro ao fazer login.", "danger");
            }
        }
    }

    return (
        <div className={style.login_conteudo}>
            <img src={Logo} alt="Logo-Tarefa360" className={style.logo} />

            <Form onSubmit={handleLogin}>

                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Digite seu e-mail"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formSenha" className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <div>
                        <Form.Control
                        type={verSenha}
                        placeholder="******"
                        name="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                        <button type={"button"} onClick={handleSenha} className={style.botao_verSenha}>
                            {verSenha === 'password' ? <IoIosEyeOff /> : <IoIosEye />}
                        </button>
                    </div>
                </Form.Group>
                <button type="submit" className={style.botao_novo}>Entrar</button>
            </Form>
        </div>
    )
}