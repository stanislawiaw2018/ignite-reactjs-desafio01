
import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import Swal from 'sweetalert2';


interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}


export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [auxtask, setauxTask] = useState(0);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);



  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) {
      return (
        <>

          {Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Você não pode inserir uma tarefa em branco',
            showConfirmButton: true,

          })}

          {document.getElementById("texto")?.focus}
        </>

      )
    } else {
      const newTask = {
        id: Math.floor(Math.random() * 1000),
        title: newTaskTitle,
        isComplete: false
      }
      setTasks(oldState => [...oldState, newTask]);
      setNewTaskTitle('');
    }
  }


  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const editedTask = tasks.map(task => task.id === id ? {
      ...task, isComplete: !task.isComplete
    } : task);

    setTasks(editedTask);
  }


  //Função para captura o ID da taks selecionada
  function captureId(id: number) {


    setauxTask(id)

    setModal(!modal) //para abrir o modal


  }

  //Função para remover a task selecionada
  function handleRemoveTask(id: number) {
    // Swal.fire({
    //   title: 'Realmente deseja remover essa tarefa?',
    //   showDenyButton: true,
    //   confirmButtonText: `Sim`,
    //   denyButtonText: `Não`,
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     const filteredTask = tasks.filter(task => task.id !== id);
    //     console.log(id)
    //     setTasks(filteredTask)
    //     Swal.fire({
    //       title: 'Exclusão!',
    //       text: 'Tarefa deletada com sucesso!',
    //       icon: 'success',
    //       showConfirmButton: false,
    //       timer: 3000
    //     })
    //   }
    // })
    const filteredTask = tasks.filter(task => task.id !== id);
    setTasks(filteredTask)
    // setModal(!modal) //para fechar o modal

  }


  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            id="texto"
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <div>
                {console.log(task)}
                <Button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>{<FiTrash />}</Button>
                {/* <Button type="button" data-testid="remove-task-button" onClick={() => captureId(task.id)}>{<FiTrash />}</Button>
                <Modal isOpen={modal} toggle={toggle} >
                  <ModalHeader toggle={toggle}>Atenção</ModalHeader>
                  <ModalBody>
                    Realmente deseja remover esse item?
                  </ModalBody>
                  <ModalFooter>

                    <Button type="button" color="primary" size="lg" onClick={() => handleRemoveTask(auxtask)}>Sim</Button>
                    <Button type="button" data-testid="remove-task-button" color="danger" size="lg" onClick={toggle}>Não</Button>
                  </ModalFooter>
                </Modal> */}

              </div>

            </li>
          ))}

        </ul>


      </main>
    </section>
  )
}