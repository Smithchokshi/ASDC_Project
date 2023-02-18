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


    //para meters to be passed through dbconn "id", "userId","url","db_username","db_password","created_at"
    // unlike rest id should be passed to identify and edit the tuple
    @Override
    public DbConn editConn(DbConn dbConn){

        return connectionRepository.save(dbConn);
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


//    #for this method to work just pass the id  the parameter in link no payload is required
    @Override
    public DbConn deleteConnById(int id){
        DbConn conn = getConnById(id);
        connectionRepository.deleteById(id);
        return conn;
    }
}
