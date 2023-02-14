package com.groupten.datawiz.repository;
import com.groupten.datawiz.model.DbConn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface ConnectionRepository extends CrudRepository<DbConn, Integer>{

    DbConn findDbConnByConnectionId(String id);
}
