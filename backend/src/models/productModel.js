const { pool } = require('../config/db');

const getAllProducts = async (limit = 12, offset = 0) => {
    const countResult = await pool.query('SELECT COUNT(*) FROM products');
    const total = parseInt(countResult.rows[0].count, 10);

    const result = await pool.query(
        'SELECT * FROM products ORDER BY created_at DESC LIMIT $1 OFFSET $2',
        [limit, offset]
    );

    return {
        products: result.rows,
        total,
        limit,
        offset
    };
};

const getProductBySlug = async (slug) => {
    const result = await pool.query('SELECT * FROM products WHERE slug = $1', [slug]);
    return result.rows[0];
};

const createProduct = async (product) => {
    const { name, slug, description, price, discount_price, stock, images, category, ingredients } = product;
    const query = `
    INSERT INTO products (name, slug, description, price, discount_price, stock, images, category, ingredients)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;
    const values = [name, slug, description, price, discount_price, stock, images, category, ingredients];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const updateProduct = async (id, product) => {
    // Simplification: Update all fields or dynamic query
    // For now, let's assuming full update or just handle specific logic if needed
    // Using a dynamic query helper or just updating known fields would be better
    const { name, slug, description, price, discount_price, stock, images, category, ingredients } = product;
    const query = `
    UPDATE products
    SET name = $1, slug = $2, description = $3, price = $4, discount_price = $5, stock = $6, images = $7, category = $8, ingredients = $9
    WHERE id = $10
    RETURNING *;
  `;
    const values = [name, slug, description, price, discount_price, stock, images, category, ingredients, id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const deleteProduct = async (id) => {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
};

module.exports = {
    getAllProducts,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
};
