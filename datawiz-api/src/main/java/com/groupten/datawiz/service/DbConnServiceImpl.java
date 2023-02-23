package com.groupten.datawiz.service;
import com.groupten.datawiz.model.DbConn;
import com.groupten.datawiz.repository.ConnectionRepository;
import com.groupten.datawiz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.*;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

@Service
@Transactional
public class DbConnServiceImpl implements DbConnService{

    @Autowired
    ConnectionRepository connectionRepository;

    @Override
    public DbConn saveConn(DbConn dbConn){
        DbConn conn = new DbConn(dbConn.getUserId(), dbConn.getUrl(), dbConn.getName(), dbConn.getDb_username(), dbConn.getDb_password());
        return connectionRepository.save(conn);
    }


    /*
    Body should provide existing connection_id and edited fields like so:
    {
    "id": 252,
    "userId": 52,
    "name": "updated",
    "url": "updated",
    "db_username": "updated",
    "db_password": "updated"
    }
     */
    @Override
    public DbConn editConn(DbConn dbConn){
        DbConn originalConn = getConnById(dbConn.getId());
        originalConn.setUrl(dbConn.getUrl());
        originalConn.setName(dbConn.getName());
        originalConn.setDb_username(dbConn.getDb_username());
        originalConn.setDb_password(dbConn.getDb_password());
        String created_at = getConnById(dbConn.getId()).getCreated_at();
        SimpleDateFormat dateFormat = new SimpleDateFormat("YYYY-MM-DD hh:mm:ss");
        Calendar cal = Calendar.getInstance();
        String updated_at = dateFormat.format(cal.getTime());
        originalConn.setUpdated_at(updated_at);
        return connectionRepository.save(originalConn);
    }


    @Override
    public DbConn getConnById(int id){
        DbConn conn = connectionRepository.findById(id).orElse(null);
        return conn;
    }

    @Override
    public List<DbConn> findDbConnById(int id){
        DbConn conn = connectionRepository.findById(id).orElse(null);
        List<DbConn> resConn = new ArrayList<>();
        if(conn==null){
            return resConn;
        }
        resConn.add(conn);
        return resConn;
    }

    @Override
    public List<DbConn> getAllConnByUserId(int userId){
        List<DbConn> allConns = connectionRepository.findByUserId(userId);
        if(allConns.isEmpty()){
            return new ArrayList<>();
        }
        else{
            return allConns;
        }
    }


    //for this method to work just pass the id the parameter in link no payload is required
    @Override
    public DbConn deleteConnById(int id){
        DbConn conn = getConnById(id);
        connectionRepository.deleteById(id);
        return conn;
    }

    @Override
    public List<Boolean> testConn(DbConn dbConn){
        List<Boolean> res = new ArrayList<>();
        String url = dbConn.getUrl();
        String username = dbConn.getDb_username();
        String password = dbConn.getDb_password();
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
        }
        catch(ClassNotFoundException e){
            System.out.println(e.getMessage());
            res.add(false);
            return res;
        }
        try{
            url = url.split("//")[1];
            url = "jdbc:mysql://"+url;
            Connection conn = DriverManager.getConnection(url, username, password);
            Statement statement = conn.createStatement();
            statement.execute("show databases;");
            conn.close();
        }
        catch(SQLException e){
            res.add(false);
            return res;
        }
        res.add(true);
        return res;
    }
}
