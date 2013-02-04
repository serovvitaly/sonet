<?php

class Catalog_Controller extends Base_Controller
{
    public function action_index()
    {
        $categories = Category::all();
        
        return View::make('itcore.catalog.index', array('cats' => $categories, 'current_cat' => Input::get('ct', 1)));
    }
    
    
    public function action_good($id)
    {
        $good = Good::find($id);
        
        if (!$good) {
            return Response::error('404');
        }
        
        return View::make('itcore.catalog.good', $good->to_array());
    }
}