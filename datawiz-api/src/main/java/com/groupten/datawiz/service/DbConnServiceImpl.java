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
        DbConn conn = new DbConn(dbConn.getUserId(), dbConn.getUrl(), dbConn.getDb_username(), dbConn.getDb_password());
        return connectionRepository.save(conn);
    }


    /*
    Body should provide existing connection_id and edited fields like so:
    {
    "id": 252,
    "userId": 52,
    "url": "updated",
    "db_username": "updated",
    "db_password": "updated"
    }
     */
    @Override
    public DbConn editConn(DbConn dbConn){
        DbConn originalConn = getConnById(dbConn.getId());
        originalConn.setUrl(dbConn.getUrl());
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
    public List<DbConn> getAllConnByUserId(int userId){
        List<DbConn> allConns = connectionRepository.findByUserId(userId);
        if(allConns.isEmpty()){
            return null;
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
}
