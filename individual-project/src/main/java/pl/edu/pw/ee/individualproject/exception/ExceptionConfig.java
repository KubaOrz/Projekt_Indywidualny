package pl.edu.pw.ee.individualproject.exception;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Date;

@ControllerAdvice
public class ExceptionConfig {

    @AllArgsConstructor
    private static class ErrorMessage {

        private String message;
        private Date errorDate;
    }

    @ExceptionHandler(value = EntityNotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ResponseEntity<ErrorMessage> handleEntityNotFoundException(EntityNotFoundException e) {
        ErrorMessage message = new ErrorMessage(e.getMessage(), new Date());
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = InvalidTokenException.class)
    public ErrorMessage handleInvalidTokenException(InvalidTokenException e) {
        return new ErrorMessage(e.getMessage(), new Date());
    }

    @ExceptionHandler(value = UserAlreadyLoggedInException.class)
    public ErrorMessage handleUserAlreadyLoggedInException(UserAlreadyLoggedInException e) {
        return new ErrorMessage(e.getMessage(), new Date());
    }
}

