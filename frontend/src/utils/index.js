import sweetAlert from 'sweetalert2';
import jwt from 'jsonwebtoken';

export const alert = (icon = 'success', title = 'lorem Ipsu', text = 'data lorem ipsu') =>
	sweetAlert.fire({
		icon,
		title,
		text
	});

export const alertDeleteJob = (data, deleteJob) => {
	sweetAlert
		.fire({
			title: 'Estas seguro?',
			text: `eliminara la tarea: ${data.name}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar'
		})
		.then(async (result) => {
			if (result.value) {
        await deleteJob(data.id);
        sweetAlert.fire('Eliminado', 'Se elimino correctamente', 'success');
			}
		});
};

export const addToken = (data) => sessionStorage.setItem('token', data);

export const getToken = () => {
	if (sessionStorage.getItem('token')) {
		return jwt.verify(sessionStorage.getItem('token'), process.env.REACT_APP_SECRET_KEY_TOKEN);
	}

	return false;
};
