package com.expense.tracker.service;

import com.expense.tracker.entity.Expense;
import com.expense.tracker.repository.ExpenseRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ExpenseService {
    private final ExpenseRepository repository;

    public ExpenseService(ExpenseRepository repository) {
        this.repository = repository;
    }

    public List<Expense> getAll() {
        return repository.findAll();
    }

    public Expense getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction not found"));
    }

    public Expense create(Expense expense) {
        expense.setId(null);
        validateType(expense.getType());
        return repository.save(expense);
    }

    public Expense update(Long id, Expense input) {
        Expense existing = getById(id);
        validateType(input.getType());
        existing.setTitle(input.getTitle());
        existing.setAmount(input.getAmount());
        existing.setCategory(input.getCategory());
        existing.setType(input.getType());
        existing.setDate(input.getDate());
        existing.setDescription(input.getDescription());
        return repository.save(existing);
    }

    public void delete(Long id) {
        Expense existing = getById(id);
        repository.delete(existing);
    }

    private void validateType(String type) {
        if (type == null || (!type.equalsIgnoreCase("INCOME") && !type.equalsIgnoreCase("EXPENSE"))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Type must be INCOME or EXPENSE");
        }
    }
}
