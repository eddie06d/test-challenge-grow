import { Button, Input, Modal, Popconfirm, Space, Table } from "antd";
import { HomeLayout } from "../layout/HomeLayout"
import { useRef, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { columns } from "../helpers/getColumnsTable";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from "react-redux";
import { startDeleteUser, startLoadUsers, startUpdateUser } from "../../store/users/thunks";

export const HomePage = () => {
  // Booleano para mostrar el modal
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  // Variable para guardar la fila seleccionada
  const [ rowSelected, setRowSelected ] = useState({});

  // Custom hook para manejar el formulario de actualizacion
  const { formState, onInputChange } = useForm(rowSelected);
  const { username, email, firstName, lastName } = formState;

  // Variables para manejar la busqueda por columna
  const [ searchText, setSearchText ] = useState('');
  const [ searchedColumn, setSearchedColumn ] = useState('');
  const searchInput = useRef(null);

  // Lectura del listado de usuarios paginado
  const { list, pagination } = useSelector(state => state.users);
  const dispatch = useDispatch();

  // Buscador
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // Resetear filtros
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  // Crear el tag y funcionalidad del buscador por columnas
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columnsWithSearchProps = columns.map(col => {
    return col.key === 'id' ? 
      col : {
        ...col,
        ...getColumnSearchProps(col.key)
      }
  });
  
  // Listado de columnas de la tabla
  const columnsTable = [ ...columnsWithSearchProps, {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <Space size="middle">
        <Button
          color='primary' 
          variant='solid'
          onClick={ () => handleSelectRow(record) }
          icon={ <i className="fa-solid fa-pen-to-square"></i> }
        />
        <Popconfirm 
          title='Sure to delete?' 
          onConfirm={ () => handleDelete(record) }
        >
          <Button
            color='danger' 
            variant='solid'
            icon={ <i className="fa-solid fa-trash"></i> }
          />
        </Popconfirm>
      </Space>
    ),
  }]

  // Listado de usuarios
  const data = list.map(user => ({
    key: user.id,
    id: user.id,
    username: user.usuario,
    email: user.correo,
    fullname: `${ user.apell_paterno } ${ user.apell_materno }, ${ user.nombre }`
  }));

  // Seleccion de la fila
  const handleSelectRow = (row) => {
    const { id, username, email, fullname } = row;
    setRowSelected({
      id, username, email,
      firstName: fullname.split(',')[1].trim(),
      lastName: fullname.split(',')[0].trim(),
    });
    setIsModalOpen(true);
  };

  // Cerrar el modal
  const handleCancel = () => setIsModalOpen(false);

  // Eliminar usuario
  const handleDelete = (row) => {
    dispatch(startDeleteUser(row.id));
  };

  // Actualizar usuario
  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(startUpdateUser(rowSelected.id, {
      usuario: formState.username,
      correo: formState.email,
      nombre: formState.firstName,
      apell_paterno: formState.lastName.split(' ')[0],
      apell_materno: formState.lastName.split(' ')[1]
    }));
    handleCancel();
  };

  return (
    <HomeLayout>
      <p className="text-lg font-semibold mb-5">Table Admin</p>
      <Table columns={ columnsTable } dataSource={ data } pagination={{
        current: pagination?.currentPage,
        pageSize: pagination?.limit,
        total: pagination?.totalUsers,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20'],
        onChange: (page, pageSize) => {
          dispatch(startLoadUsers(page, pageSize));
        }
      }} />
      <Modal 
        title="Update Row" 
        open={ isModalOpen } 
        onCancel={ handleCancel }
        footer={ null }
      >
        <form onSubmit={ handleUpdate } className="flex flex-col gap-3">
          <Input
            type='text'
            name='username'
            onChange={ onInputChange }
            value={ username } 
            placeholder="Your username" 
            prefix={<i className="fa-solid fa-user"></i>}
            required 
          />
          <Input
            type='email'
            name='email'
            onChange={ onInputChange }
            value={ email } 
            placeholder="Your email" 
            prefix={<i className="fa-solid fa-envelope"></i>}
            required 
          />
          <Input
            type='text'
            name='firstName'
            onChange={ onInputChange }
            value={ firstName } 
            placeholder="Your first name" 
            prefix={<i className="fa-solid fa-signature"></i>}
            required 
          />
          <Input
            type='text'
            name='lastName'
            onChange={ onInputChange }
            value={ lastName } 
            placeholder="Your last name" 
            prefix={<i className="fa-solid fa-signature"></i>}
            required 
          />
          <div className="flex items-center gap-4 justify-end">
            <Button htmlType="button" onClick={ handleCancel }>Cancel</Button>
            <Button htmlType="submit" variant="solid" color="primary">Update</Button>
          </div>
        </form>
      </Modal>
    </HomeLayout>
  )
}
