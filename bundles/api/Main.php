<?php

namespace Api;

use \Laravel\Validator;

class Main
{
    public function hello($page = 5){ sleep(5); return 'page6666-'.$page;}
    
    
    public function apps_get($id)
    {
        $app = \Laravel\Auth::user()->apps()->find($id);
        
        return array(
            'id'         => $app->id,
            'app_id'     => $app->app_id,
            'app_name'   => $app->app_name,
            'app_secret' => $app->app_secret,
        );
    }
    
    
    public function add_good($data = NULL)
    {
        if (!$data OR !isset($data['data']) OR count($data['data']) < 1) {
            return false;
        }
        
        $output = NULL;
        
        $data = (array) $data['data'];
        
        $_rules = array(
            'name'        => 'required',
            'description' => 'required',
            'articul'     => 'required',
            'price'       => 'required|numeric',
        );
        
        $validation = Validator::make($data, $_rules);
        
        if ($validation->fails()) {
            return $validation->errors;
        }
        
        if (isset($data['id']) AND $data['id'] > 0) {
            $good = \Good::find($data['id']);
            
            unset($data['id']);
            
            if (count($data) > 0) {
                foreach ($data AS $key => $value) {
                    $good->$key = $value;
                }
            }
            
            $good->touch();
        }
        else {
            $good = \Good::create($data);
        }        
        
        return $good->id;
    }
    
}