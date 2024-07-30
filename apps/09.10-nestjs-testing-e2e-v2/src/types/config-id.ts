/**Purpose: Based on the db, you can change the type of id
Reason: In mongodb id is not Integer
If you use any other database then change the type here
Also try to use "this type(ConfigId)" when you are using any id type
*/

//uncomment this line when you are using postgres or any other database where id is integer
// export type ConfigId = number;

//uncomment this line when you are using mongodb or any other database where id is a string
export type ConfigId = string;
