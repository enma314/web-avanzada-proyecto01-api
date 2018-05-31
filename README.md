# web-project-01

Primer proyecto de Programación Web para el profesor Willis Polanco. En este repositorio se encuentra ubicado el API.

## API Routes

### ------------------------------------------------JOBS--------------------------------------------------------

### GET

Get all jobs

https://web-project-01.herokuapp.com/api/jobs

Get all jobs given the category

https://web-project-01.herokuapp.com/api/jobs/:category

https://web-project-01.herokuapp.com/api/jobs/:pageNumber/:nPerPage

### POST

Create a new job (company, type, position, location, category, description, applyguide, email)

https://web-project-01.herokuapp.com/api/jobs/createJob

### DELETE

https://web-project-01.herokuapp.com/api/jobs/:id

### ------------------------------------------------USERS-------------------------------------------------------

### GET

Get all users

https://web-project-01.herokuapp.com/api/users

Get user by ID

https://web-project-01.herokuapp.com/api/users/:id

### POST

Sign up (Name, Username, type, password, email) 

https://web-project-01.herokuapp.com/api/users/signUp

### PUT

Update user by ID (ID, name, username, type, password, email)

https://web-project-01.herokuapp.com/api/users/:id

### DELETE

Delete user by ID

https://web-project-01.herokuapp.com/api/users/:id
