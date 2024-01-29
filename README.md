# TaskApp
## Clone the Repository

```git clone https://github.com/ManulaGunatilleke/TaskApp.git```

## Navigate to Project Directory:

`bash cd TaskApp`

## Note -: Maven used as project management tool

## Database Schema and Considerations:

The database schema is designed to support tasks associated with users. Ensure you have a MySQL database configured and update the application.properties file with the appropriate database connection details.

Database creation scripts or migration scripts should be available in the project. Run them to create the necessary tables.

## Running the Application Locally:

Once the dependencies are installed and the database is configured:

Choose IDE
-backend can be run using intelijID
-frontend can be run using VSCode (command -> npm run dev)

The application should be accessible at http://localhost:8080. Adjust the port number if it's configured differently.

## Additional Notes:

Ensure that Java 17 is installed on your system.

Check for any specific environment configurations or profiles (e.g., development, production) in the application.

If there are frontend components, additional steps might be required for building and running the frontend. Check the project structure for details.

For any additional services (e.g., message brokers, caches) that the application depends on, make sure they are running.



