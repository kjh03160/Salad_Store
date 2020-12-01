
import pandas as pd
import re

def snake_to_camel(query_result):
    data = query_result[0]
    keys = data.keys()
    for snake_style in keys:
        camel_style = re.sub('_[a-z]', lambda m : m.group().upper().replace('_', ""), snake_style)
        data[camel_style] = data.pop(snake_style)    
    return [data]

# SQLAlchemy query proxy to dictionary
def query_to_dict(ret):
    if ret is not None:
        query = [{key: value for key, value in row.items()} for row in ret if row is not None]
        if len(query):
            return snake_to_camel(query)
        return [{}]
    else:
        return [{}]

# N * M * K rows SQL query to N rows list 
def many_to_one(data):
    df = pd.DataFrame(data)
    orders = map(int, df['order_pk'].unique())
    order_list = []
    for order in orders:
        order_df = df[df['order_pk'] == order]
        order_dict = {'order_pk' : order, 'order_time' : order_df.iloc[0]['order_time'], 'menus' : []}
        products = map(int, order_df['product_pk'].unique())
        for product in products:
            product_df = order_df[order_df['product_pk'] == product]
            product_dict = {'product_pk' : product, 'menu_name' : product_df.iloc[0]['menu_name'], 'quantity' : int(product_df.iloc[0]['quantity']),
                            'options' : product_df['option_name'].values.tolist()}
            order_dict['menus'].append(product_dict)
        order_list.append(order_dict)

    return order_list


