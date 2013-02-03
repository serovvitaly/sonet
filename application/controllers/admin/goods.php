<?php

class Admin_Goods_Controller extends Base_Controller
{
    
    public function action_index()
    {
        $data['goods'] = Good::all();
        
        return View::make('admin.goods.index', $data);
    }
    
    public function action_add()
    {
        return View::make('admin.goods.add');
    }
    
    public function action_edit($id)
    {
        if ($id > 0) {
            $good = Good::find($id)->to_array();
        }
        
        return View::make('admin.goods.edit', $good);
    }
    
    public function action_delete($id = 0)
    {
        if ($id > 0) {
            Good::find($id)->delete();
        }
        
        return Redirect::to('/admin/goods');
    }
    
}