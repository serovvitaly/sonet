<?php

class Catalog_Controller extends Base_Controller
{
    public function action_good($id)
    {
        $good = Good::find($id);
        
        if (!$good) {
            return Response::error('404');
        }
        
        return View::make('catalog.good', $good->to_array());
    }
}