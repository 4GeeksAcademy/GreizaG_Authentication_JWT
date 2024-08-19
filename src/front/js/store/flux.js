import { Navigate } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],

			users: [],

			singleUser: {}
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			newUser: (data) => {
				const actions = getActions()
				return fetch(process.env.BACKEND_URL + "/api/newuser", {
					method: "POST",
					body: JSON.stringify(data),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => {
						console.log(response)
						if (response.ok) {
							return response.json()
						}
						throw new Error("Ocurrió un error creando un nuevo usuario")
					})
					.then(data => {
						console.log(data)
						return true
					})
					.catch(error => {
						console.log(error)
						return false
					})
			},

			login: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password })
					});

					if (!response.ok) {
						const errorData = await response.json();
						return { success: false, message: errorData.msg || "Login no existoso", status: response.status };
					}

					const data = await response.json();
					console.log(data.access_token);

					// Verifica si localStorage está disponible
					if (typeof localStorage !== "undefined") {
						localStorage.setItem("access_token", data.access_token);
						localStorage.setItem("id", `${data.id}`);
						localStorage.setItem("email", data.email);
					} else {
						console.warn("localStorage is not available.");
					}

					return { success: true, data: data };
				} catch (error) {
					console.error("Error:", error);
					return { success: false, message: error.message || "Ocurrió un error inesperado" };
				}
			},

			getSingleUser: () => {
				const token = localStorage.getItem('access_token')
				fetch(process.env.BACKEND_URL + "/api/private/singleuser", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						'Authorization': 'Bearer ' + token
					}
				})
					.then((response) => {
						return response.json()
					})
					.then((data) => {
						console.log(data)
						setStore({ singleUser: data })
						return data
					})
					.catch((error) => {
						console.log(error)
					})
			},

			logout: () => {
				localStorage.removeItem('access_token');
				setStore({ singleUser: {} });
				Navigate('/')
			}
		}
	};
};

export default getState;
