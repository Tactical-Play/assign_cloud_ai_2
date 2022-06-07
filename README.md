# assign_cloud_ai_2
Create and work with azure storage, image data, Azure cognitive services; in NodeJS .
The main file to be executed is the "proj_azure_node_01.js" file. It subsequently invokes the other powershell scripts and custom node modules.
Other node dependencies are: azure/cognitiveservices-computervision, azure/ms-rest-js and node-powershell@3.0.1 libraries.

Problem Statement:
1) Work with Console or UI app
2) Input- name for a storage account
3) Check whether name is valid/available or not
4) Use exception handling to ensure that if name is invalid user can enter a new name
5) once name is valid, create a storage account and a container called "data" inside it
6) Wait for the storage account to be created, and once created,
7) ask user for a file input
8) upload the file to the created storage account
9) Display an error message to the user if the file is not an image
10) Display an error if the image contains adult content
11) Invoke Azure Cognitive Services to identify all objects, brands, and faces in the images
12) Display the results on the screen (console or UI) and save them in Azure Storage as a blob.
