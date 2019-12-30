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
				try {
					const resultDelete = await deleteJob(data.id);
					if(resultDelete){
						sweetAlert.fire('Eliminado', 'Se elimino correctamente', 'success');
						return;
					}
					alert('error', 'error eliminando la tarea', 'no se pudo eliminar la tarea, vuelva a intentarlo mas tarde');

				} catch (error) {
					console.log('=======error=======> ', error);
					if (typeof(error.response) !== 'undefined' && !error.response.data.state) {
						alert('error', 'error eliminando la tarea', error.response.data.data);
						return;
					}
					alert('error', 'error eliminando la tarea', 'no se pudo eliminar la tarea, vuelva a intentarlo mas tarde');
				}
				}
			}
		);
};

export const addToken = (data) => sessionStorage.setItem('token', data);

export const getToken = () => {
	if (sessionStorage.getItem('token')) {
		return jwt.verify(sessionStorage.getItem('token'), process.env.REACT_APP_SECRET_KEY_TOKEN);
	}

	return false;
};
