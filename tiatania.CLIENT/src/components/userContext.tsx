import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext'; // Asegúrate de importar el contexto correctamente desde su ubicación real

interface UserContextProps {
    rol: 'Admin' | 'User'; // Tipo de la prop rol: solo puede ser "Admin" o "User"
    children: React.ReactNode;
}

function UserContext({ rol, children }: UserContextProps) {

    const currentUser = useContext(AuthContext);

    const isRole = currentUser && currentUser.rolesName.includes(rol);

    return (
        <div>
            {isRole ? (
               children
            ) : (
                null
            )}
        </div>
    );
};

export default UserContext;
