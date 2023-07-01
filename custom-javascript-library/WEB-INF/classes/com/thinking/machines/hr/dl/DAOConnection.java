package com.thinking.machines.hr.dl;
import java.sql.*;
//import com.thinking.machines.hr.dl.*;
public class DAOConnection{
    private DAOConnection(){}
    static public Connection getConnection() throws DAOException{
        Connection connection = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection  = DriverManager.getConnection("jdbc:mysql://localhost:3306/tmdb","tmdbuser","tmdbuser");
            return connection;
        } catch (Exception e) {
            System.out.println("DAO Connection Exception Statement : "+e.getMessage());
            throw new DAOException(e.getMessage());
        }
    }
}