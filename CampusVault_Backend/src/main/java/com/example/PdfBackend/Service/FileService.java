package com.example.PdfBackend.Service;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class FileService {

    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Autowired
    private GridFsOperations gridFsOperations;

    // Upload PDF with domain metadata
    public String uploadFile(MultipartFile file, String domain) throws IOException {
        DBObject metaData = new BasicDBObject();
        metaData.put("domain", domain);

        ObjectId id = gridFsTemplate.store(
                file.getInputStream(),
                file.getOriginalFilename(),
                file.getContentType(),
                metaData
        );
        return id.toString();
    }

    // List all stored PDFs
    public List<com.mongodb.client.gridfs.model.GridFSFile> listFiles() {
        return gridFsTemplate.find(new Query()).into(new java.util.ArrayList<>());
    }

    //  Download/View PDF by ID
    public GridFsResource downloadFile(String id) throws IOException {
        com.mongodb.client.gridfs.model.GridFSFile file = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(id)));
        if (file != null) {
            return gridFsOperations.getResource(file);
        }
        return null;
    }

    // Delete PDF by ID
    public void deleteFile(String id) {
        gridFsTemplate.delete(new Query(Criteria.where("_id").is(id)));
    }
}
